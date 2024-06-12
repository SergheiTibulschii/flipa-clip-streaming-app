/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/*@ts-expect-error*/}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
