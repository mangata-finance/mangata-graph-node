import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class AssetsInfo {
  constructor(props?: Partial<AssetsInfo>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  name!: string

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("int4", {nullable: false})
  decimals!: number

  @Column_("text", {nullable: true})
  description!: string | undefined | null
}
