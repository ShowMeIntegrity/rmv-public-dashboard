export function buildBanner(data) {
  if (!data || data.length === 0) {
    return "<div>No data available</div>";
  }

  const raw = data.map(d => d["Raw Sigs"]);

  const totalNum = raw.at(-3);
  const volNum   = raw.at(-2);
  const paidNum  = raw.at(-1);

  const totalStr = totalNum.toLocaleString('en-US');
  const volStr   = volNum.toLocaleString('en-US');
  const paidStr  = paidNum.toLocaleString('en-US');

  return `
    <div class="banner">
      <div class="banner-item">
        <span class="label">Signature Goal: 300,000</span>
        <br>
        <span class="label">Total Signature Collected: ${totalStr}</span>
        <br>
        <span class="label">Volunteer: ${volStr}</span>
        <br>
        <span class="label">Paid: ${paidStr}</span>
      </div>
    </div>
  `;
}