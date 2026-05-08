import { ROOMS_DATA, MATERIALS_DATA, CATEGORY_LABELS } from 'src/materials/materials.data';

export class MockEngine {
  generate(room: string, selections: Record<string, string | null>) {
    const roomData = ROOMS_DATA.find(r => r.id === room);
    if (!roomData) return this.errorResponse();

    const issues: string[] = [];
    const missing: string[] = [];
    const recommendations: string[] = [];
    const nextActions: string[] = [];
    const costs: string[] = [];

    roomData.categories.forEach(catId => {
      if (!selections[catId]) missing.push(CATEGORY_LABELS[catId]);
    });

    Object.entries(selections).forEach(([catId, matId]) => {
      if (!matId) return;
      const mat = (MATERIALS_DATA[catId] || []).find(m => m.id === matId);
      if (!mat) return;
      costs.push(mat.cost);

      if (mat.id === 'marble') {
        recommendations.push(
          `${CATEGORY_LABELS[catId]} — Marble is premium. Expect higher cost and regular sealing maintenance.`
        );
      }
    });

    const flooringMat = MATERIALS_DATA['flooring']?.find(m => m.id === selections['flooring']);
    const wallMat = MATERIALS_DATA['wall_finish']?.find(m => m.id === selections['wall_finish']);

    if (flooringMat?.tone === 'dark' && wallMat?.tone === 'dark') {
      issues.push('Both flooring and wall finish are dark — the room may feel smaller and heavier.');
      recommendations.push('Consider a lighter wall finish or flooring to open up the space.');
    }

    if (missing.includes(CATEGORY_LABELS['lighting'])) {
      recommendations.push('Lighting is missing — one of the most impactful selections for any room.');
    }

    if (missing.length > 0) {
      nextActions.push(`Complete missing selections: ${missing.join(', ')}.`);
    } else {
      nextActions.push('All selections complete — ready to request a quote.');
      nextActions.push('Share this specification with your designer or builder.');
    }

    return {
      room,
      costLevel: this.calculateCostLevel(costs),
      issues,
      missing,
      recommendations,
      nextActions,
    };
  }

  private calculateCostLevel(costs: string[]): string {
    if (!costs.length) return 'Unknown';
    const has = (v: string) => costs.includes(v);
    if (has('high') && has('low')) return 'Mixed';
    if (has('high')) return 'High';
    if (has('medium')) return 'Medium';
    return 'Low';
  }

  private errorResponse() {
    return {
      room: 'unknown',
      costLevel: 'Unknown',
      issues: ['Invalid room selected'],
      missing: [],
      recommendations: [],
      nextActions: ['Please select a valid room type'],
    };
  }
}