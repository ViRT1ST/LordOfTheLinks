import { getLinksBySearch, createLink, updateLink } from '@/server-actions';

export default async function TestPage() {
  const links = await getLinksBySearch('next');

  // await createLink({
  //   title: 'Reddit Web Dev Subreddits',
  //   url: 'https://www.reddit.com/r/learnprogramming+web_design+webdev+javascript+reactjs+nextjs/new/',
  //   tags: ['reddit', 'webdev', 'javascript', 'reactjs', 'nextjs'],
  // });

  // await updateLink({
  //   id: 6,
  //   title: 'Reddit Web Dev Subreddits',
  //   url: 'https://www.reddit.com/r/reactjs+nextjs/new/',
  //   tags: ['reactjs', 'nextjs'],
  // });

  return (
    <div className="flex flex-col mt-20 ml-20" >
      {links.map((link) => (
        <div key={link.id}>
          <h1>{link.title}</h1>
          <p>{link.url}</p>
          <p>------------------------</p>
        </div>
      ))}
    </div>
  );
}
