interface GreetingProps {
  name: string;
}

export function Greeting({ name }: GreetingProps) {
  return <h1 id="greeting">{`Hello, ${name}!`}</h1>;
}
