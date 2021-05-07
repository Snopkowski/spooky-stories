import { Skeleton, Spinner } from '@chakra-ui/react';
export default function Loader({ show }) {
  return show ? <Skeleton height='15vh' /> : null;
}
