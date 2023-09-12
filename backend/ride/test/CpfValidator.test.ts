import CpfValidator from "../src/CpfValidator"

test.each([
    "01234567890",
    "565.486.780-60",
    "147.864.110-00",
    "04765351076"
])("Deve validar um cpf", function (cpf: string) {
    const cpfValidator = new CpfValidator();
    expect(cpfValidator.validate(cpf)).toBeTruthy();
})

test.each([
    "04765351000",
    "047.653.510",
    "047.653.510-AA",
    "11111111111",
    ""
])("Não deve validar um cpf", function (cpf: string) {
    const cpfValidator = new CpfValidator();
    expect(cpfValidator.validate(cpf)).toBeFalsy();
})
