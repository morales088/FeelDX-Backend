export const ROOMS_DATA = [
  { id: 'kitchen',  label: 'Kitchen',     code: 'KT-01', categories: ['flooring','wall_finish','benchtop','cabinetry','lighting'] },
  { id: 'bathroom', label: 'Bathroom',    code: 'BT-01', categories: ['flooring','wall_finish','benchtop','cabinetry','lighting'] },
  { id: 'living',   label: 'Living room', code: 'LR-01', categories: ['flooring','wall_finish','sofa','table','lighting'] },
  { id: 'bedroom',  label: 'Bedroom',     code: 'BD-01', categories: ['flooring','wall_finish','bed','lighting'] },
  { id: 'laundry',  label: 'Laundry',     code: 'LY-01', categories: ['flooring','wall_finish','cabinetry','lighting'] },
];

export const CATEGORY_LABELS: Record<string, string> = {
  flooring:   'Flooring',
  wall_finish:'Wall finish',
  benchtop:   'Benchtop',
  cabinetry:  'Cabinetry',
  sofa:       'Sofa',
  table:      'Table',
  bed:        'Bed frame',
  lighting:   'Lighting',
};

export const MATERIALS_DATA: Record<string, { id: string; label: string; cost: string; tone: string; color: string; code: string }[]> = {
  flooring: [
    { id: 'timber',   label: 'Timber',   cost: 'medium', tone: 'warm',    color: '#C8905A', code: 'FL-001' },
    { id: 'marble',   label: 'Marble',   cost: 'high',   tone: 'light',   color: '#DCDAD4', code: 'FL-002' },
    { id: 'vinyl',    label: 'Vinyl',    cost: 'low',    tone: 'neutral', color: '#7A8C88', code: 'FL-003' },
    { id: 'concrete', label: 'Concrete', cost: 'medium', tone: 'dark',    color: '#908C86', code: 'FL-004' },
  ],
  wall_finish: [
    { id: 'white',  label: 'White paint',  cost: 'low',    tone: 'light',   color: '#ECEAE6', code: 'WF-001' },
    { id: 'dark',   label: 'Dark paint',   cost: 'low',    tone: 'dark',    color: '#2A2826', code: 'WF-002' },
    { id: 'timber', label: 'Timber panel', cost: 'medium', tone: 'warm',    color: '#B48258', code: 'WF-003' },
    { id: 'tile',   label: 'Tile',         cost: 'medium', tone: 'neutral', color: '#B8C4C8', code: 'WF-004' },
  ],
  benchtop: [
    { id: 'marble',   label: 'Marble',   cost: 'high',   tone: 'light',   color: '#D4D0C8', code: 'BT-001' },
    { id: 'laminate', label: 'Laminate', cost: 'low',    tone: 'neutral', color: '#C4B496', code: 'BT-002' },
    { id: 'stone',    label: 'Stone',    cost: 'high',   tone: 'neutral', color: '#908580', code: 'BT-003' },
    { id: 'timber',   label: 'Timber',   cost: 'medium', tone: 'warm',    color: '#BC8A56', code: 'BT-004' },
  ],
  cabinetry: [
    { id: 'white_gloss',   label: 'White gloss',   cost: 'medium', tone: 'light', color: '#EEECEA', code: 'CB-001' },
    { id: 'timber_veneer', label: 'Timber veneer', cost: 'medium', tone: 'warm',  color: '#C09268', code: 'CB-002' },
    { id: 'dark_matte',    label: 'Dark matte',    cost: 'medium', tone: 'dark',  color: '#2E2A28', code: 'CB-003' },
  ],
  sofa: [
    { id: 'linen',   label: 'Linen',   cost: 'medium', tone: 'light', color: '#D8D0C0', code: 'SF-001' },
    { id: 'leather', label: 'Leather', cost: 'high',   tone: 'warm',  color: '#8A6040', code: 'SF-002' },
    { id: 'velvet',  label: 'Velvet',  cost: 'medium', tone: 'dark',  color: '#7A7890', code: 'SF-003' },
  ],
  table: [
    { id: 'timber', label: 'Timber', cost: 'medium', tone: 'warm',  color: '#B88050', code: 'TB-001' },
    { id: 'glass',  label: 'Glass',  cost: 'medium', tone: 'light', color: '#C8D4D8', code: 'TB-002' },
    { id: 'marble', label: 'Marble', cost: 'high',   tone: 'light', color: '#D8D4CC', code: 'TB-003' },
  ],
  bed: [
    { id: 'upholstered',  label: 'Upholstered',  cost: 'medium', tone: 'neutral', color: '#C8C0B0', code: 'BD-001' },
    { id: 'timber_frame', label: 'Timber frame', cost: 'medium', tone: 'warm',    color: '#B07A48', code: 'BD-002' },
    { id: 'metal_frame',  label: 'Metal frame',  cost: 'low',    tone: 'neutral', color: '#909090', code: 'BD-003' },
  ],
  lighting: [
    { id: 'pendant',    label: 'Pendant',    cost: 'medium', tone: 'neutral', color: '#D0C49A', code: 'LT-001' },
    { id: 'recessed',   label: 'Recessed',   cost: 'medium', tone: 'neutral', color: '#D8D6D0', code: 'LT-002' },
    { id: 'track',      label: 'Track',      cost: 'low',    tone: 'neutral', color: '#A4A09C', code: 'LT-003' },
    { id: 'floor_lamp', label: 'Floor lamp', cost: 'low',    tone: 'neutral', color: '#C8B882', code: 'LT-004' },
  ],
};
