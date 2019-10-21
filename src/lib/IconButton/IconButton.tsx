import React from 'react';

import { Button, Icon } from 'antd';
import { ButtonProps } from 'antd/es/button';

const mappings: any = {
  remove: <Icon type='delete' />,
  plus: <Icon type='plus' />,
  'arrow-up': <Icon type='arrow-up' />,
  'arrow-down': <Icon type='arrow-down' />,
};

type IconButtonProps = ButtonProps & {
  icon: string;
};

export const IconButton: React.FC<IconButtonProps> = ({ icon, ...otherProps }: IconButtonProps) => {
  return (
    <Button {...otherProps} size='small'>
      {mappings[icon]}
    </Button>
  );
};

export default IconButton;
