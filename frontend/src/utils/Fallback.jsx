function Fallback(props) {
    const {fallback, shouldFallback, children} = props;
    if(shouldFallback && fallback) return fallback;
    return children;
}

export default Fallback;