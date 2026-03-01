import 'katex/dist/katex.min.css'
import { Code } from '@/modules/mdx/inline/code'
import { H1, H2, H3, H4, H5, H6 } from '@/modules/mdx/inline/h'
import { P } from '@/modules/mdx/inline/p'
import { Pre } from '@/modules/mdx/inline/pre'
import { A } from '@/modules/mdx/inline/a'
import { Strong } from '@/modules/mdx/inline/strong'
import { Abstract } from '@/modules/mdx/inline/abstract'
import { Table, THead, TBody, TR, TH, TD } from '@/modules/mdx/inline/table'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        code: Code,
        pre: Pre,
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: P,
        a: A,
        strong: Strong,
        Abstract,
        table: Table,
        thead: THead,
        tbody: TBody,
        tr: TR,
        th: TH,
        td: TD,
        ...components,
    }
}