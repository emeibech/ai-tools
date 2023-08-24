interface Props {
  className?: string;
}

export default function Footer(props: Props) {
  return (
    <footer className={props.className}>
      <article className="text-xs min-[360px]:text-sm font-light text-center">
        Copyright © 2023 emeibech AI. All rights reserved.
      </article>
    </footer>
  );
}
