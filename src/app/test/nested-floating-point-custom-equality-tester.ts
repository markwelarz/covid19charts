export function nestedFloatingPointCustomEqualityTester(a: any, b: any): boolean {
  if (typeof a === 'number' && typeof b === 'number') {
    if(!Number.isInteger(a) || !Number.isInteger(b)) {
      return a.toFixed(2) === b.toFixed(2);
    }
  }
}
