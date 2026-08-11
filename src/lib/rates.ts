export type Gender = 'female' | 'male'
export type Health = 'preferred' | 'standard' | 'high-risk'

const femaleStandard: [number, number][] = [[40, 2.4], [50, 3.0], [55, 3.6], [60, 4.2], [65, 5.0], [70, 6.4], [75, 8.7], [80, 12.5], [85, 16.0]]
const maleStandard: [number, number][] = [[40, 3.0], [50, 3.8], [55, 4.6], [60, 5.3], [65, 6.6], [70, 8.4], [75, 11.3], [80, 16.4], [85, 21.0]]

function interpolate(table: [number, number][], age: number): number {
  if (age <= table[0][0]) return table[0][1]
  if (age >= table[table.length - 1][0]) return table[table.length - 1][1]
  for (let i = 0; i < table.length - 1; i++) {
    const [age1, rate1] = table[i]
    const [age2, rate2] = table[i + 1]
    if (age >= age1 && age <= age2) {
      const ratio = (age - age1) / (age2 - age1)
      return rate1 + (rate2 - rate1) * ratio
    }
  }
  return table[table.length - 1][1]
}

export function getRatePerThousand(gender: Gender, health: Health, age: number): number {
  const baseTable = gender === 'female' ? femaleStandard : maleStandard
  const standardRate = interpolate(baseTable, age)

  if (health === 'preferred') return Math.round(standardRate * 0.8 * 100) / 100
  if (health === 'high-risk') return Math.round(standardRate * 1.3 * 100) / 100
  return Math.round(standardRate * 100) / 100
}
