import { Injectable } from '@nestjs/common';
import { ROOMS_DATA, MATERIALS_DATA, CATEGORY_LABELS } from '../materials/materials.data';

@Injectable()
export class RoomsService {
  getRooms() {
    return ROOMS_DATA.map(room => ({
      id: room.id,
      label: room.label,
      code: room.code,
      categories: room.categories.map(catId => ({
        id: catId,
        label: CATEGORY_LABELS[catId],
        options: (MATERIALS_DATA[catId] || []).map(mat => ({
          id: mat.id,
          label: mat.label,
          color: mat.color,
          code: mat.code,
          cost: mat.cost,
        })),
      })),
    }));
  }
}
