export type BackfillUnmatchedReason = 'no_exact_match' | 'external_id_taken';

export type BackfillUnmatched = {
  id: number;
  name: string;
  reason: BackfillUnmatchedReason;
  externalId?: string;
};

export type BackfillReport = {
  total: number;
  matched: number;
  unmatched: BackfillUnmatched[];
};

const REASON_LABEL: Record<BackfillUnmatchedReason, string> = {
  no_exact_match: 'No exact match',
  external_id_taken: 'IGDB ID already used by another game',
};

const REASON_ORDER: BackfillUnmatchedReason[] = [
  'no_exact_match',
  'external_id_taken',
];

export const formatBackfillReport = (report: BackfillReport): string => {
  const lines = [
    'IGDB backfill report',
    '====================',
    `Total games without IGDB source: ${report.total}`,
    `Matched: ${report.matched}`,
    `Unmatched: ${report.unmatched.length}`,
  ];

  for (const reason of REASON_ORDER) {
    const items = report.unmatched.filter((item) => item.reason === reason);
    if (items.length === 0) continue;

    lines.push('', `${REASON_LABEL[reason]}:`);
    for (const item of items) {
      const externalId = item.externalId ? ` | IGDB ${item.externalId}` : '';
      lines.push(`- ${item.id} | ${item.name}${externalId}`);
    }
  }

  return lines.join('\n');
};
