export default function StatisitcsTab(map: Map<string, number>) {
  return (
    <div>
      {Array.from(map.keys())
        .sort()
        .map((key) => (
          <p>{key + " : " + map.get(key)}</p>
        ))}
    </div>
  );
}
