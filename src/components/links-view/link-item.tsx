'use client';

import Link from 'next/link';
import Image from 'next/image';

import { type DbLinkWithTags } from '@/types/index';
import { cnJoin } from '@/utils/classes';
import { getDomain } from '@/utils/parsing';
import { FAVICON_SIZE } from '@/config/public';
import LinkItemMenu from '@/components/links-view/link-item-menu';

type LinkItemProps = {
  link: DbLinkWithTags;
};

const faviconSize = FAVICON_SIZE / 2;

export default function LinkItem({ link }: LinkItemProps) {
  const linkHint = link.info || '';
  const linkDomain = getDomain(link.url);
  const linkImageSrc = `/images/site-icons/${linkDomain}.png`;

  return (
    <div className={twItemContainer}>
      <div className={twItemLeftPart}>
        <Link className={twNextLink} href={link.url}  title={linkHint} target="_blank">
          <div className={twFavicon}>
            <Image
              src={linkImageSrc}
              alt="Favicon"
              width={faviconSize}
              height={faviconSize}
              priority={true}
            />
          </div>
          <div className={twTitleAndUrlContainer}>
            <h2 className={twTitle}>{link.title}</h2>
            <p className={twDomain}>{linkDomain}</p>
          </div>

        </Link>
      </div>

      <div className={twItemRightPart}>
        <LinkItemMenu link={link} />
      </div>
    </div>
  );
}
const twItemContainer = cnJoin(
  'mb-[4px] flex flex-row',
  'border rounded-sm border-black/20',
  'font-geistsans',
  // 'bg-white/50 '
  // 'bg-[#f3f2f2]'
   'bg-[#f2f2f2]',
);

const twItemLeftPart = cnJoin(
  'p-3 flex flex-col flex-grow'
);

const twNextLink = cnJoin(
  'flex flex-row items-center'
);

const twFavicon = cnJoin(
  'flex rounded-sm overflow-hidden'
);

const twTitleAndUrlContainer = cnJoin(
  'pl-3 w-[900px]'
);

const twTitle = cnJoin(
  'text-lg text-black truncate font-geistsans'
);

const twDomain = cnJoin(
  'text-sm text-black/50 font-geistsans'
);

const twItemRightPart = cnJoin(
  'flex flex-col items-end',
);
