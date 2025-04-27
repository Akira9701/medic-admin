export type TypographyVariant =
  | 'large-title'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'text'
  | 'subheadline1'
  | 'subheadline2'
  | 'caption1'
  | 'caption2';

export type TypographyColor = 'primary' | 'secondary' | 'success' | 'error' | 'white';
export type TypographyWeight = 'regular' | 'medium' | 'bold';
export type TypographyTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';

export type CombinedTypographyVariant = `${TypographyVariant}-${TypographyWeight}`;
