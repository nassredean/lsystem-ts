export class LSystem {
  public sentence: string;

  constructor(
    public axiom: string,
    public rules: { [key: string]: string | undefined },
    public iterations: number,
    public angle: number
  ) {
    this.sentence = this.iterate();
  }

  iterate(): string {
    let output = this.axiom;
    for (let i = 0; i < this.iterations; i++) {
      let nextOutput = '';
      for (const char of output) {
        nextOutput += this.rules[char] as string || char;
      }
      output = nextOutput;
    }
    return output;
  }
}
