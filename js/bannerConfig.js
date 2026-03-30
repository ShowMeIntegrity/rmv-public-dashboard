window.buildBanner = function (data) {
  if (!data || data.length === 0) {
    return "<div>No data available</div>";
  }

  const rmv  = data.rmv;
  const fw   = data.fw.data;
  const raw  = rmv.map(d => d["Raw Sigs"]);
  const paid = fw.map(d => d.signature_count);

  const allGoalNum = 300000;
  const volGoalNum = 220000;
  const volNum     = raw.at(-2);
  const paidNum    = paid.reduce((sum, val) => sum + val, 0);
  const totalNum   = volNum + paidNum;
  const percentNum = totalNum/allGoalNum * 100;

  const allGoalStr = allGoalNum.toLocaleString();
  const volGoalStr = volGoalNum.toLocaleString();
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
          <span class="goal-number">${allGoalStr}</span>
        </div>

        <div class="banner-sub">
          ${percentStr}% of goal
        </div>
      </div>

      <div class="banner-card secondary">
        <div class="banner-title">Collection Breakdown</div>

        <div class="breakdown-row">
          <span>Volunteers</span>
          <span class="value volunteer">
            <span class="current">${volStr}</span>
            <span class="divider">/<span>
            <span class="goal">${volGoalStr} goal</span>
          </span>
        </div>

        <div class="breakdown-row">
          <span>Paid</span>
          <span class="value paid">${paidStr}</span>
        </div>
      </div>

    </div>
  `;
}