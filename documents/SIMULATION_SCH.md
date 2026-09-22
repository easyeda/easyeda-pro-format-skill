# SIMULATION_SCH

> 返回 [SKILL.md](../SKILL.md) 入口文档

## 领域概述

**仿真原理图**（SIM_SCH）是仿真分析所在的**原理图**文档。它与原理图页同族——共用同一套图元与坐标系（见 SCH_PAGE 的说明），因而也**共用同一个编译器**。它下面挂着一张或多张**仿真页**（SIMULATION），关系是**反向**的：由仿真页的 META 指出自己属于哪份仿真原理图，本文档自身不记挂载者。
## 图元索引

| 类型 | 简述 | 图元 | 定义 |
|------|------|------|------|
| [TMSimSchematic](../primitives/SIMULATION_SCH/meta.md) | 仿真原理图 META 类型 | META | [详细](../primitives/SIMULATION_SCH/meta.md) |
| [TDifferentialPairWire](../primitives/SIMULATION_SCH/differential_pair.md) | 差分对 | DIFFERENTIAL_PAIR | [详细](../primitives/SIMULATION_SCH/differential_pair.md) |
| [TNetClassWire](../primitives/SIMULATION_SCH/net_class.md) | 网络类（**线格式**） | NET_CLASS | [详细](../primitives/SIMULATION_SCH/net_class.md) |
| [TEQLenNetGrpWire](../primitives/SIMULATION_SCH/eql_net_grp.md) | 等长网络组（**线格式**） | EQL_NET_GRP | [详细](../primitives/SIMULATION_SCH/eql_net_grp.md) |

## Related Resources

- [返回 SKILL.md](../SKILL.md)
- [所有 primitives](../primitives/)
- [所有 examples](../examples/)

