import Link from "next/link";

const Room = () => {
  return (
    <div>
      <h1>Room</h1>
      <p>
        Please <Link href="/create-room">Create a Room</Link> or join a room
        with the appropriate room code.
      </p>
    </div>
  );
};

export default Room;
