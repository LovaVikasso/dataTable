import {ComponentProps, FC} from 'react'
import s from './table.module.scss'

//Везде будет одинаковая структура ComponentProps<'table tag'>,
//все кастомные компоненты таблицы будут принимать такие же props как и теги table
//кастомизируем такие теги как table, thead, tbody, th, tr, td в свои кастомные компоенты таблицы
//классы можно использовать которые уже есть в таблице или переназначитб новые

export const Root: FC<ComponentProps<'table'>> = ({className, ...rest}) => {
    const classNames = {
        table: `${className ? `${className} ` : ''}${s.table}`,
    }

    return <table className={classNames.table} {...rest} /> //возвращаем сам тег таблицы, столизуем и отдаем остальные пропсы
}
export const Head: FC<ComponentProps<'thead'>> = props => {
    return <thead {...props} />
}
export const HeadData: FC<ComponentProps<'th'>> = props => {
    return <th className={s.head} {...props} />
}
export const Body: FC<ComponentProps<'tbody'>> = props => {
    return <tbody {...props} />
}
export const Row = ({className, ...rest}: ComponentProps<'tr'>) => {
    const classNames = {
        row: `${className ? `${className} ` : ''}${s.row}`,
    } // в последем ряду будут разные стили,но базовые стили таблицы сохраняться
    return <tr className={classNames.row} {...rest} />
}
export const Data = ({className, ...rest}: ComponentProps<'td'>) => {
    const classNames = {
        data: `${className ? `${className} ` : ''}${s.data}`,
    } // в последем ряду будут разные стили,но базовые стили таблицы сохраняться

    return <td className={classNames.data} {...rest} />
}

//нужен если в таблице нет данных
export const Empty = ({className}: ComponentProps<'div'>) => {
    const classNames = {
        empty: `${className ? `${className} ` : ''}${s.empty}`,
    }

    return (
        <div className={classNames.empty}>
            <h4> You see an empty table, there is no data yet</h4>
        </div>
    )
}
export const Table = {
    Root,
    Head,
    Body,
    Row,
    HeadData,
    Data,
    Empty,
}