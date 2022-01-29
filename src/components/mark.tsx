export const Mark = ({ name, keyword }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => {
        return (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "#257AFD" }}>{keyword}</span>
            )}
          </span>
        );
      })}
    </>
  );
};
