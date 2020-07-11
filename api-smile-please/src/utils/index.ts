import { orderBy, map, filter, flatten, get, isEmpty } from 'lodash';
import { parse } from 'node-html-parser';

export const getRelevantImages = images => {
  const orderedImages = orderBy(images, ['ups', 'downs'], ['desc', 'asc']);
  const relevantLinkImages = flatten(
    map(
      filter(orderedImages, content => {
        return (
          content.type === 'image/gif' ||
          (content.images_count > 0 &&
            ['image/jpeg', 'image/jpg', 'image/png'].includes(
              content.images[0].type,
            ))
        );
      }),
      content => {
        const {
          id,
          title,
          description,
          link,
          ups,
          downs,
          type,
          images,
        } = content;
        const imageInfo = {
          id,
          title,
          //description,
          link,
          //type,
        };
        const filteredImages = content.images_count
          ? images
              .filter(image =>
                ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
                  image.type,
                ),
              )
              .map(item => ({ ...imageInfo, link: item.link, id: item.id }))
          : [imageInfo];

        return filteredImages;
      },
    ),
  );

  return relevantLinkImages;
};

export const getFileExtension = filename => {
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? null : ext[1];
};

export const parseAndGetImage = content => {
  const root = parse(content);
  if (root.childNodes[0] && root.childNodes[0].childNodes) {
    const imageNode = root.childNodes[0].childNodes[0];
    const url = get(imageNode, 'rawAttrs');
    if (url) {
      const link = url.replace('src=', '').replace(/['"]+/g, ''); //.replaceAll("^\"|\"$", ""); //url.match(/"((?:\\.|[^"\\])*)"/)[0];
     // const type = getFileExtension(link);
      return {
        tagName: get(imageNode, 'tagName'),
        link,
      };
    }
  } else {
    return {};
  }
};
