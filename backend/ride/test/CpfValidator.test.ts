import CpfValidator from "../src/CpfValidator"

test("Deve validar um cpf", function () {
    expect(CpfValidator.validate("04765351076")).toBeTruthy();
})

test("Não deve validar um cpf", function () {
    expect(CpfValidator.validate("04765351000")).toBeFalsy();
})