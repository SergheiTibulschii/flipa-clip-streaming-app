import { useParams } from 'react-router-dom';

type VideoDetailsPageProps = {};

export const VideoDetailsPage = ({}: VideoDetailsPageProps) => {
  const { videoId } = useParams();
  return <div>Video Details: {videoId}</div>;
};
