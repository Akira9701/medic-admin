import { FC, createElement } from 'react';
import cn from 'classnames';
import styles from './Typography.module.scss';
import { TypographyColor, TypographyTag, CombinedTypographyVariant } from '../types';
import i18n from '@/app/translates';

interface ITypography {
  children: React.ReactNode;
  variant: CombinedTypographyVariant;
  color?: TypographyColor;
  className?: string;
  tag?: TypographyTag;
  onClick?: () => void;
}

const Typography: FC<ITypography> = ({
  children,
  variant,
  color = 'primary',
  className,
  tag = 'p',
  onClick,
}) => {
  const htmlTag = tag;

  let variantPart = '';
  let weightPart = '';

  // Проверяем, является ли вариант 'large-title'
  if (variant.includes('large-title')) {
    variantPart = 'large-title';
    weightPart = variant.split('-')[2];
  } else {
    // Разделяем комбинированный вариант на части
    [variantPart, weightPart] = variant.split('-');
  }

  return createElement(
    htmlTag,
    {
      className: cn(
        i18n.language === 'ru' ? styles.typography__ru : styles.typography__en,
        styles.typography,
        styles[`typography--${variantPart}`],
        styles[`typography--${color}`],
        styles[`typography--${weightPart}`],
        className,
      ),
      onClick,
    },
    children,
  );
};

export default Typography;
