import * as React from 'react';
import { Sidebar, TitlePage }  from '../index';
import { TemplateDiv, ChildrenDiv } from './style'

interface TemplateProps {
  onClickTitle: () => void;
  title: string;
  IsBack: boolean;
  children?: React.ReactNode;
}

export default function Template({ onClickTitle, title, IsBack, children} : TemplateProps) {
  return (
    <TemplateDiv>
      <Sidebar/>
      <TitlePage title={title} IsBack={IsBack} onClick={onClickTitle}/>
      <ChildrenDiv>{children}</ChildrenDiv>
    </TemplateDiv>
  );
}