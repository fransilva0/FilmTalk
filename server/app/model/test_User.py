from app.model.User import User

class TestUser:


    def test_new_user(self):
        user = User(username="exemple",email="exemple@gmail.com",password="biscoito")
        assert user.username == 'exemple'
        assert user.email == 'exemple@gmail.com'
        assert user.password == 'biscoito'