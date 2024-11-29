'use client';

import Link from 'next/link';
import Image from 'next/image';

// import { CircleArrowRight as ShipWheel, Nut as Tag } from 'lucide-react';
import { CiBookmarkCheck        as Tag } from 'react-icons/ci';
import { HiLink      as ShipWheel } from 'react-icons/hi2';

//CircleArrowRight
//SquareArrowOutUpRight
//Globe
//Settings

import { type DbLinkWithTags } from '@/types/index';
import { cnJoin } from '@/utils/classes';
import { getDomain } from '@/utils/parsing';
import { buildHintForLinkItem } from '@/utils/links';
import { FAVICON_SIZE } from '@/config/public';
import LinkItemMenu from '@/components/links-view/link-item-menu';

type LinkItemProps = {
  link: DbLinkWithTags;
};

const faviconSize = FAVICON_SIZE / 2;

export default function LinkItem({ link }: LinkItemProps) {

  const linkDomain = getDomain(link.url);
  const linkImageSrc = `/images/site-icons/${linkDomain}.png`;
  const linkHint = buildHintForLinkItem(link);
  const linkTagsElements = link.tags.map((tag) => {
    return (
      <span key={tag.id} className={twTag}>
        {/* <Tag className="h-3 w-3 mr-[1px] ml-[2px] mt-[1px] " /> */}
       {tag.value}
      </span> 
    );
  });

  // const linkTagsElements = link.tags.map((tag) => tag.value).join(' · ');

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
            <div className={twDomain}>
              {/* <ShipWheel className="h-3 w-3 mr-[2px] mt-[1px] " /> */}

              <div className={twDomainSpan}>
                {linkDomain}
              </div>

              {/* <span>&nbsp;&middot;&nbsp;</span> */}

              {/* <div className="w-1"></div> */}

              {/* <Tag className="h-3 w-3 mr-[2px] ml-[4px] mt-[1px] " /> */}
              
              <div className={'flex flex-row gap-x-[4px]'}>
                {linkTagsElements}
              </div>
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
  'min-w-[48px] min-h-[48px] flex rounded-sm overflow-hidden'
);

const twTitleAndUrlContainer = cnJoin(
  'max-w-[1000px] pl-3'
);

const twTitle = cnJoin(
  'text-lg text-black truncate'
);

const twDomain = cnJoin(
  'text-sm text-black/50',
  'flex flex-row items-center',
  'min-h-[20px]'
);

const twItemRightPart = cnJoin(
  'flex flex-col items-end ',
);



const twDomainSpan = cnJoin(
  // 'inline-flex justify-center items-center', //px-[4px]
  // 'bg-transparent border-black/10 text-black/60',
  // 'text-sm whitespace-nowrap leading-none',
  // 'mr-1'


  // 'inline-flex justify-center items-center', //px-[4px]
  // 'bg-transparent border-black/10 text-black/60',
  // 'text-sm whitespace-nowrap leading-none',
  // 'rounded-sm border ',
  // 'px-[5px] py-0.5 mr-1'


  'inline-flex justify-center items-center', //px-[4px]
  'bg-transparent text-black/60',
  'text-sm whitespace-nowrap leading-none',
  'py-0.5 mr-1'
);


const twTag = cnJoin(
  'inline-flex justify-center items-center', //px-[4px]
  'bg-transparent border-black/10 text-black/60',
  'text-sm whitespace-nowrap leading-none',
  'rounded-sm border',
  'px-[5px] py-0.5'
);
