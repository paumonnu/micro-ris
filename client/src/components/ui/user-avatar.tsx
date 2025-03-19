import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export function UserAvatar({ image, userName = '' }) {
  const nameArr = userName.split(' ');
  const acronym = nameArr.reduce((acc, cur) => {
    return acc + cur[0];
  }, '');

  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{acronym}</AvatarFallback>
    </Avatar>
  );
}
