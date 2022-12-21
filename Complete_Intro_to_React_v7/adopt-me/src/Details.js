import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  return <h2>Pet id: {id}</h2>;
};

export default Details;
