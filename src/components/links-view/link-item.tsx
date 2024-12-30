'use client';

import Link from 'next/link';
import Image from 'next/image';

import { type DbLinkWithTags } from '@/types/index';
import { createTooltipTextForLink, cnJoin } from '@/utils/formatting';
import LinkItemMenu from '@/components/links-view/link-item-menu';

type LinkItemProps = {
  link: DbLinkWithTags;
};

export default function LinkItem({ link }: LinkItemProps) {
  const tags = [...link.tags].sort((a, b) => a.value.localeCompare(b.value));

  const iconSrc = `/images/site-icons/${link.domain}.png`;
  const tooltip = createTooltipTextForLink(link);

  return (
    <div className={twContainer}>
      <div className={twMainPart}>
        <Link className={twLink} href={link.url} title={tooltip} target="_blank">
          <div className={twIcon}>
            <Image
              src={iconSrc}
              alt="Favicon"
              width={48}
              height={48}
              priority={true}
            />
          </div>
          <div className={twDetails}>
            <h2 className={twTitle}>{link.title}</h2>
            <div className={twKeywords}>
              <span className={twKeywordsItem}>
                {link.domain}
              </span>
              {tags.map((tag) => (
                <span key={tag.id} className={twKeywordsItem}>
                  {tag.value}
                </span> 
              ))}
            </div>
          </div>
        </Link>
      </div>

      <div className={twMenuPart}>
        <LinkItemMenu link={link} />
      </div>
    </div>
  );
}

const twContainer = cnJoin(`
  mb-1 flex flex-row
  bg-[#f2f2f2] border-black/20 border rounded-sm
`);

const twMainPart = cnJoin(`
  p-3 flex flex-col flex-grow
  truncate
`);

const twLink = cnJoin(`
  flex flex-row items-center
`);

const twIcon = cnJoin(`
  min-w-[48px] min-h-[48px] flex
  rounded-sm overflow-hidden
`);

const twDetails = cnJoin(`
  max-w-[1100px] h-full pl-3
  flex flex-col justify-between
  truncate
`);

const twTitle = cnJoin(`
  text-black text-lg leading-tight truncate
`);

const twKeywords = cnJoin(`
  flex flex-row items-center gap-x-1
`);

const twKeywordsItem = cnJoin(`
  px-[5px] py-[3px]
  inline-flex justify-center items-center
  text-black/60 border-black/10 bg-transparent rounded-sm border
  text-sm whitespace-nowrap leading-none
`);

const twMenuPart = cnJoin(`
  flex flex-col items-end
`);

