import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  radius = '8px',
  className = '',
}) => (
  <div
    className={`skeleton ${className}`}
    style={{ width, height, borderRadius: radius }}
    aria-hidden="true"
  />
);