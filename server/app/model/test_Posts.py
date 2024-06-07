from app.model.Posts import Posts

class TestPosts:

    def test_new_posts(self):
        posts = Posts(title="exemplo de titulo",publication="exemplo de publicacao",user_id=1)
        assert posts.title == "exemplo de titulo"
        assert posts.publication == "exemplo de publicacao"
        assert posts.user_id == 1