import Image, { ImageLoaderProps } from "next/image";
import {ReactElement} from "react";
import styled from "styled-components";
import {BASE_URL} from "@root/site.config";

const GitHub = styled.div``;

export const imgLoader = ({
                            src,
                            width,
                            quality,
                          }: {
  src: string;
  width: number;
  quality?: number;
}): string => {
  return `${BASE_URL}${src}?w=${width}&q=${quality || 75}`;
};

export const GitHubIcon = (): ReactElement => {
  return (
    <GitHub>
      <Image
        loader={({ src, width, quality }: ImageLoaderProps) => imgLoader({ src, width, quality })}
        src={'/images/icons/github-icon.webp'} alt={'github-icon'} width={24} height={24} />
    </GitHub>
  )
}