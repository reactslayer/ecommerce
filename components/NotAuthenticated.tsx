export function NotAuthenticated(props) {
  return (
    <div>
      <span>Failure!</span>
      <span>You are not authenticated. Please <a href="/">sign in</a> or <a href="/signup">sign up</a> first!</span>
    </div>
  );
}
