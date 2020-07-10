import React from 'react';
import addImage from './modifiers/addImage';
import ImageComponent from './Image';

const defaultTheme = {
  image: null,
};

export default (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme;
  let Image = config.imageComponent || ImageComponent;
  if (config.decorator) {
    Image = config.decorator(Image);
  }
  const extraProps = {};
  if (config.s3) {
    extraProps.s3 = config.s3;
  }
  let ThemedImage = props => <Image {...props} {...extraProps} theme={theme} />;
  if (config.imgReplacement) {
    ThemedImage = () => config.imgReplacement;
  }
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = block.getEntityAt(0);
        if (!entity) return null;
        const type = contentState.getEntity(entity).getType();
        if (type === 'IMAGE' || type === 'image') {
          return {
            component: ThemedImage,
            editable: false,
          };
        }
        return null;
      }

      return null;
    },
    addImage,
  };
};

export const Image = ImageComponent;
