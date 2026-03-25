export function buildBanner(data) {
  if (!data || data.length === 0) {
    return "<div>No data available</div>";
  }

  const raw = data.map(d => d["Raw Sigs"]);
  const goalNum    = 300000;
  const totalNum   = raw.at(-3);
  const volNum     = raw.at(-2);
  const paidNum    = raw.at(-1);
  const percentNum = totalNum/goalNum * 100;

  const goalStr    = goalNum.toLocaleString();
  const totalStr   = totalNum.toLocaleString();
  const volStr     = volNum.toLocaleString();
  const paidStr    = paidNum.toLocaleString();
  const percentStr = percentNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return `
    <div class="banner">

      <div class="banner-card primary">
        <div class="banner-title">Signatures Collected</div>
        
        <div class="banner-main">
          <span class="big-number">${totalStr}</span>
          <span class="divider">/</span>
          <span class="goal-number">${goalStr}</span>
        </div>

        <div class="banner-sub">
          ${percentStr}% of goal
        </div>
      </div>

      <div class="banner-card secondary">
        <div class="banner-title">Collection Breakdown</div>

        <div class="breakdown-row">
          <span>Volunteers</span>
          <span class="value volunteer">${volStr}</span>
        </div>

        <div class="breakdown-row">
          <span>Paid Collectors</span>
          <span class="value paid">${paidStr}</span>
        </div>
      </div>

    </div>
  `;
}