import { Meta } from '@storybook/react'
import {Table} from "./Table.tsx";

export default {
    title: 'Components/Table',
    component: Table.Root,
} as Meta<typeof Table.Root>

export const Default = {
    args: {
        children: (
            <>
                <Table.Head>
                    <Table.Row>
                        <Table.HeadData>Название</Table.HeadData>
                        <Table.HeadData align="center">Описание</Table.HeadData>
                        <Table.HeadData>Ссылка</Table.HeadData>
                        <Table.HeadData>Тип</Table.HeadData>
                        <Table.HeadData>Вид</Table.HeadData>
                        <Table.HeadData />
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Data>Web Basic</Table.Data>
                        <Table.Data>
                            Some data Some data Some data Some data Some data Some data Some data
                        </Table.Data>
                        <Table.Data>
                            <a  href="https://google.com/" target="_blank">
                                Ссылка
                            </a>
                        </Table.Data>
                        <Table.Data>Основной</Table.Data>
                        <Table.Data>Читать</Table.Data>
                        <Table.Data>
                        </Table.Data>
                    </Table.Row>
                    <Table.Row>
                        <Table.Data>Web Basic</Table.Data>
                        <Table.Data>
                            Another data Another data Another data Another data Another data Another data
                        </Table.Data>
                        <Table.Data>ссылка</Table.Data>
                        <Table.Data>Основной</Table.Data>
                        <Table.Data>Читать</Table.Data>
                        <Table.Data>✨</Table.Data>
                    </Table.Row>
                </Table.Body>
            </>
        ),
    },
}

const data = [
    {
        id: '01',
        title: 'Title',
        description: 'Description',
        link: 'https://www.google.com/',
        category: 'Main',
        type: 'Type',
    },
    {
        id: '02',
        title: 'Some title',
        description: 'Some description',
        link: 'https://www.google.com/',
        category: 'Main',
        type: 'Some type',
    },
    {
        id: '03',
        title: 'Another title',
        description: 'Another description',
        link: 'https://www.google.com/',
        category: 'Main',
        type: 'Another type',
    },
]

export const WithMapMethod = {
    args: {
        children: (
            <>
                <Table.Head>
                    <Table.Row>
                        <Table.HeadData>Название</Table.HeadData>
                        <Table.HeadData align="center">Описание</Table.HeadData>
                        <Table.HeadData>Ссылка</Table.HeadData>
                        <Table.HeadData>Тип</Table.HeadData>
                        <Table.HeadData>Вид</Table.HeadData>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data.map(item => (
                        <Table.Row key={item.id}>
                            <Table.Data>{item.title}</Table.Data>
                            <Table.Data>{item.description}</Table.Data>
                            <Table.Data>{item.link}</Table.Data>
                            <Table.Data>{item.category}</Table.Data>
                            <Table.Data>{item.type}</Table.Data>
                        </Table.Row>
                    ))}
                </Table.Body>
            </>
        ),
    },
}

export const Empty = {
    render: () => <Table.Empty />,
}