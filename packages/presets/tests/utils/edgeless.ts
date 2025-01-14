/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SurfaceBlockComponent } from '@blocksuite/blocks';
import type { Page } from '@blocksuite/store';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import type { EditorContainer } from '../../src/index.js';

export function getSurface(page: Page, editor: EditorContainer) {
  const surfaceModel = page.getBlockByFlavour('affine:surface');

  return editor.root.value!.view.viewFromPath('block', [
    page.root!.id,
    surfaceModel[0]!.id,
  ]) as SurfaceBlockComponent;
}

const defaultProps = {
  shape: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rect: (props: any) => {
      return {
        xywh: '[10, 10, 100, 100]',
        strokeColor: 'red',
        fillColor: '--affine-palette-transparent',
        filled: props.fillColor === '--affine-palette-transparent',
        radius: 0,
        strokeWidth: 4,
        strokeStyle: 'solid',
        shapeStyle: 'General',
      };
    },
  } as Record<string, any>,
};

export function addElement(
  type: string,
  props: Record<string, any>,
  surface: SurfaceBlockComponent
) {
  props =
    type === 'shape'
      ? Object.assign(
          props,
          defaultProps.shape[props.shapeType as string]?.(props) ?? props
        )
      : props;
  return surface.addElement(type as any, props);
}

export function addNote(page: Page, props: Record<string, any> = {}) {
  const noteId = page.addBlock(
    'affine:note',
    {
      xywh: '[0, 0, 100, 100]',
      ...props,
    },
    page.root
  );
  page.addBlock('affine:paragraph', {}, noteId);

  return noteId;
}
