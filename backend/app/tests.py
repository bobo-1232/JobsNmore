# fmt: off
import pytest
from app import create_app, db 
from app.models import Location, Job, Occupation, Industry, Course
from sqlalchemy.exc import IntegrityError, DataError, NoResultFound
from sqlalchemy.orm import Session
from random import choice
# fmt: on

""" use session to create the app once and then use it for all tests which is faster. Switch to
function scope if you need to isolate errors between tests."""


@pytest.fixture(scope="session")
def app():
    app = create_app("initialize_db")
    app.config.update(
        {
            "TESTING": True,
        }
    )
    return app


""" creates a new database session for each test. This is slower but ensures that each test is isolated from the others. 
    Any changes made to the database are rolled back after the test is completed."""


@pytest.fixture()
def database(app):
    with app.app_context():
        connection = db.engine.connect()
        transaction = connection.begin()
        session = Session(bind=connection)
        yield session
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_request_example(client):
    response = client.get("/test_request")
    assert response.status_code == 200


def test_db_inserting_course_incorrect(database):
    # Raise an error as there is a foreign key constraint from course to occupation
    # start a new session to test the error
    with pytest.raises(IntegrityError):
        s = Course(
            Id="123",
            OnetCode="123",
            Provider="123",
            Name="123",
            Url="123",
            Type="123",
            Description="123",
        )

        database.add(s)
        """Pytest will throw a SQLAlchemy warning as the
        session is rolled back due to the expected IntegrityError and the db fixture
        rollbacks all changes after the test is completed. This is expected behavior and warning can be ignored.
        Warnings have been disabled in command line call"""

        database.commit()


def test_updating_industry(database):
    health = database.query(Industry).filter_by(Code="8.0000").one()
    # update the Group column
    health.Group = "Healthcare"
    database.commit()

    # check the changes
    assert database.query(Industry).filter_by(Code="8.0000").one().Group == "Healthcare"


def test_db_inserting_course(database):
    case = Course(
        Id="1123",
        # Must give a valid occupation
        OnetCode="15-1252.00",
        Provider="123",
        Name="123",
        Url="123",
        Type="123",
        Description="123",
    )
    database.add(case)
    database.commit()
    r = database.query(Course).filter_by(Id="1123").one()
    assert r.Id == "1123"


def test_db_querying_course(database):
    course = database.query(Course).filter_by(Id="3998-B").one()
    assert course.Type == "Advanced"


def test_db_vartype_course(database):
    entries = database.query(Course).all()
    testEntry = choice(entries)

    assert isinstance(testEntry.Id, str)
    assert isinstance(testEntry.OnetCode, str)
    assert isinstance(testEntry.Provider, str)
    assert isinstance(testEntry.Name, str)
    assert testEntry.Url is None or isinstance(testEntry.Url, str)
    assert isinstance(testEntry.Type, str)
    assert testEntry.Description == None or isinstance(testEntry.Description, str)


def test_db_inserting_location(database):
    # Case with right type of variables
    case = Location(
        City="Los Santos",
        State="San Andreas",
        Population=1234,
        Budget="Low",
        Safety="Low",
        Average_rat=5,
        Guide="fakewebsite.com",
        CityID=42,
        Photos={"photo.png"},
    )

    database.add(case)
    database.commit()
    r = database.query(Location).filter_by(City="Los Santos").one()
    assert r.CityID == 42


def test_db_queryingType_location(database):
    with pytest.raises(DataError):
        # Indexing data by the wrong type of variable
        database.query(Location).filter_by(CityID="one").one()


def test_postgres_query_location(database):
    city = database.query(Location).filter_by(CityID=1).one()
    assert city.City == "New York"


def test_adding_course(database):
    course = Course(
        Id="1234-A",
        OnetCode="11-1021.00",
        Provider="Cade",
        Name="Test Course",
        Url="website",
        Type="beginner",
        Description="A test course",
    )

    database.add(course)
    database.commit()

    new_course = database.query(Course).filter_by(Id="1234-A").one()

    assert new_course.Id == "1234-A"
    assert new_course.OnetCode == "11-1021.00"
    assert new_course.Provider == "Cade"
    assert new_course.Name == "Test Course"
    assert new_course.Url == "website"
    assert new_course.Type == "beginner"
    assert new_course.Description == "A test course"


def test_postgres_query_course(database):
    with pytest.raises(NoResultFound):
        # Querying for a course that doesn't exist
        database.query(Course).filter_by(Name="The Cheese Course").one()
