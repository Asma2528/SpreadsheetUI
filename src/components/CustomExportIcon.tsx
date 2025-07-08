const CustomExportIcon = ({ rotation = 0 }) => (
  <svg
    viewBox="0 0 26 20"
    fill="none"
    stroke="black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-3"
    style={{ transform: `rotate(${rotation}deg)`, display: 'inline-block' }}
  >
    {/* Arrow: horizontal line with arrowhead */}
    <line x1="2" y1="12" x2="20" y2="12" />
    <polyline points="16,6 22,12 16,18" />

    {/* Vertical line with some gap after arrow */}
    <line x1="25" y1="4" x2="25" y2="20" />
  </svg>
);

export default CustomExportIcon;
