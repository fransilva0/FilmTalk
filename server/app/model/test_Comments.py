from app.model.Comments import Comments


class TestComments:

    def test_new_comments(self):
        comment = Comments(commentary="exemplo de comentario",user_id=1,post_id=1)
        assert comment.commentary == "exemplo de comentario"
        assert comment.user_id == 1
        assert comment.post_id == 1