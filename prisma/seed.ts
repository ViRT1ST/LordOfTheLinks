// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const links = [
//   {
//     id: 1,
//     title: 'Web Development Learning | MDN',
//     url: 'https://developer.mozilla.org/ru/docs/Learn',
//     tags: ['javacript', 'mdn'],
//   },
//   {
//     id: 2,
//     title: 'Content Configuration - Tailwind CSS',
//     url: 'https://tailwindcss.com/docs/content-configuration#using-regular-expressions',
//     tags: ['tailwind'],
//   },
//   {
//     id: 3,
//     title: '@tanstack/react-query - npm',
//     url: 'https://www.npmjs.com/package/@tanstack/react-query',
//     tags: ['npm'],
//   },
//   {
//     id: 4,
//     title: 'zustand - npm',
//     url: 'https://www.npmjs.com/package/zustand',
//     tags: ['npm'],
//   },
//   {
//     id: 5,
//     title: 'Customizing Screens - Tailwind CSS',
//     url: 'https://tailwindcss.com/docs/screens',
//     tags: ['tailwind', 'breakpoints'],
//   },
// ];

// const tags = [
//   { value: 'javacript' },
//   { value: 'mdn' },
//   { value: 'npm' },
//   { value: 'tailwind' },
//   { value: 'breakpoints' },
// ];

// async function main() {
//   console.log(`Start seeding ...`);

//   // Create tags first to get their ids
//   const tagMap = new Map();
//   for (const tag of tags) {
//     const result = await prisma.tag.upsert({
//       where: { value: tag.value },
//       update: {},
//       create: tag,
//     });
//     tagMap.set(tag.value, result.id);
//     console.log(`Created tag with id: ${result.id}`);
//   }

//   // Then create links with tag connections
//   for (const link of links) {
//     const linkResult = await prisma.link.upsert({
//       where: { id: link.id },
//       update: {},
//       create: {
//         title: link.title,
//         url: link.url,
//         tags: {
//           connect: link.tags.map((tagName) => ({ id: tagMap.get(tagName) })),
//         },
//       },
//     });
//     console.log(`Created link with id: ${linkResult.id}`);
//   }

//   console.log(`Seeding finished.`);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
