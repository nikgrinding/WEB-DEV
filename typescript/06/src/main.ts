class Coder {
    secondLang!: string;

    constructor(
        public readonly name: string,
        public music: string,
        private age: number,
        protected lang: string = "TypeScript"
    ) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }

    public getAge() {
        return `Hello, I'm ${this.age}`;
    }
}

const nik = new Coder("Nik", "melody", 20);

console.log(nik.getAge());
// console.log(nik.age);
// console.log(nik.lang);

class WebDev extends Coder {
    constructor(public computer: string, name: string, music: string, age: number) {
        super(name, music, age);
        this.computer = computer;
    }

    public getLang() {
        return `I write ${this.lang}`;
    }
}

const monkey = new WebDev("Mac", "Monkey", "Pop", 15);
console.log(monkey.getLang());
// console.log(monkey.age);
// console.log(monkey.lang);

interface Musician {
    name: string;
    instrument: string;
    play(action: string): string;
}

class Guitarist implements Musician {
    name: string;
    instrument: string;
    constructor(name: string, instrument: string) {
        this.name = name;
        this.instrument = instrument;
    }

    play(action: string): string {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}

const Page = new Guitarist("Jimmy", "guitar");
console.log(Page.play("strums"));

class Peeps {
    static count: number = 0;
    static getCount(): number {
        return Peeps.count;
    }
    public id: number;
    constructor(public name: string) {
        this.name = name;
        this.id = ++Peeps.count;
    }
}

const John = new Peeps("John");
const Steve = new Peeps("Steve");
const Amy = new Peeps("Amy");

console.log(Amy.id);
console.log(Steve.id);
console.log(John.id);
console.log(Peeps.count);

class Bands {
    private dataState: string[];
    constructor() {
        this.dataState = [];
    }

    public get data(): string[] {
        return this.dataState;
    }

    public set data(value: string[]) {
        if (Array.isArray(value) && value.every((ele) => typeof ele === "string")) {
            this.dataState = value;
        } else {
            throw new Error("Param is not an array of strings");
        }
    }
}

const myBands = new Bands();
myBands.data = ["Neil Young", "Led Zep"];
console.log(myBands.data);
myBands.data = [...myBands.data, "Zz Top"];
console.log(myBands.data);
// myBands.data = 20;
