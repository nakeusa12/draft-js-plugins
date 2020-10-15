import React, { Component } from 'react';
import clsx from 'clsx';

export default class Image extends Component {
  render() {
    const { block, className, theme = {}, style = {}, getSignedUrl, ...otherProps } = this.props;
    // leveraging destructuring to omit certain properties from props
    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      blockStyleFn,
      ...elementProps
    } = otherProps;
    const combinedClassName = clsx(theme.image, className);
    const { src, bucket, key, width } = contentState
      .getEntity(block.getEntityAt(0))
      .getData();
    let url = src;
    if (getSignedUrl) {
      url = getSignedUrl(bucket, key);
    }

    const imgStyle = {
      ...style,
    };

    if (!style.width && width) {
      imgStyle.width = `${width}%`;
    } else if (style.width) {
      imgStyle.width = style.width;
    }

    return (
      <img
        {...elementProps}
        src={url}
        role="presentation"
        className={combinedClassName}
        style={imgStyle}
      />
    );
  }
}
