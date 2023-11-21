import { Button, Col, Image, Row } from "react-bootstrap";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deletePost,
  likePost,
  removeLikeFromPost,
} from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({ post }) {
  const { content, id: postId, imageUrl } = post;
  const [likes, setLikes] = useState(post.likes || []);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  // const token = localStorage.getItem("authToken");
  // const decode = jwtDecode(token);
  const isLiked = likes.includes(userId);

  const pic =
    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
  // const BASE_URL =
  //   "https://twitter-api-ietheng.sigma-school-full-stack.repl.co";

  // useEffect(() => {
  //   fetch(`${BASE_URL}/likes/post/${postId}`)
  //     .then((response) => response.json())
  //     .then((data) => setLikes(data))
  //     .catch((error) => console.error("Error:", error));
  // }, [postId]);

  // const isLiked = likes.some((like) => like.user_id === userId);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

  const addToLikes = () => {
    setLikes([...likes, userId]);
    dispatch(likePost({ userId, postId }));
    // axios
    // .post(`${BASE_URL}/likes`, {
    //   user_id: userId,
    //   post_id: postId,
    // })
    // .then((response) => {
    //   setLikes([...likes, { ...response.data, likes_id: response.data.id }]);
    // })
    // .catch((error) => console.error("Error:", error));
  };

  const removeFromLikes = () => {
    setLikes(likes.filter((id) => id !== userId));
    dispatch(removeLikeFromPost({ userId, postId }));
    // const like = likes.find((like) => like.user_id === userId);
    // if (like) {
    //   axios
    //     .put(`${BASE_URL}/likes/${userId}/${postId}`)
    //     .then(() => {
    //       setLikes(likes.filter((likeItem) => likeItem.user_id !== userId));
    //     })
    //     .catch((error) => console.error("Error:", error));
    // }
  };

  const handleDelete = () => {
    dispatch(deletePost({ userId, postId }));
  };

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>

      <Col>
        <strong>Emmie</strong>
        <span> @emmie.l · May 14</span>
        <p>{content}</p>
        <Image src={imageUrl} style={{ width: 150 }} />
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked ? (
              <i className="bi bi-heart-fill text-danger"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
            {likes.length}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
          <Button variant="light">
            <i
              className="bi bi-pencil-square"
              onClick={handleShowUpdateModal}
            ></i>
          </Button>
          <Button variant="light" onClick={handleDelete}>
            <i className="bi bi-trash"></i>
          </Button>
          <UpdatePostModal
            show={showUpdateModal}
            handleClose={handleCloseUpdateModal}
            postId={postId}
            originalPostContent={content}
          />
        </div>
      </Col>
    </Row>
  );
}
