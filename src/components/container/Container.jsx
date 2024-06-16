import React from 'react';
import s from './styles.module.scss';

export const Container = ({children, className = ''}) => {
  return (
    <div className={`${s.container} ${className}`}>
        {children}
    </div>
  )
}
