'use client';

import Link from 'next/link';
import Image from 'next/image';

import { DropdownItem, type DbLinkWithTags } from '@/types/index';
import { cnJoin } from '@/utils/formatting';
import { FAVICON_SIZE } from '@/config/public';
import LinkItemMenu from '@/components/links-view/link-item-menu';
import { createTooltipTextForLink } from '@/utils/formatting';

type LinkItemProps = {
  link: DbLinkWithTags;
};

const faviconSize = FAVICON_SIZE / 2;

export default function LinkItem({ link }: LinkItemProps) {
  link.tags =  [...link.tags].sort((a, b) => a.value.localeCompare(b.value));

  const linkImageSrc = `/images/site-icons/${link.domain}.png`;
  const linkHint = createTooltipTextForLink(link) || 'N/A';

  return (
    <div className={twItemContainer}>
      <div className={twItemLeftPart}>
        <Link className={twNextLink} href={link.url} title={linkHint} target="_blank">
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
            <div className={twDomainAndTags}>
              <span className={twDomainAndTagsItem}>
                {link.domain}
              </span>

              {link.tags.map((tag) => (
                <span key={tag.id} className={twDomainAndTagsItem}>
                  {tag.value}
                </span> 
              ))}
            </div>
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
  'font-inter',
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
  'min-w-[48px] min-h-[48px] flex rounded-sm overflow-hidden'
);

const twTitleAndUrlContainer = cnJoin(
  'max-w-[1000px] pl-3 h-full flex flex-col justify-between'
);

const twTitle = cnJoin(
  'text-lg text-black truncate',
  ' leading-tight '
);

const twDomainAndTags = cnJoin(
  'text-sm text-black/50',
  'flex flex-row items-center',
  'gap-x-1 leading-tight',

);

const twItemRightPart = cnJoin(
  'flex flex-col items-end ',
);



const twDomainAndTagsItem = cnJoin(
  'inline-flex justify-center items-center',
  'bg-transparent border-black/10 text-black/60',
  'text-sm whitespace-nowrap leading-none',
  'rounded-sm border',
  'px-[5px] py-[3px]',

);

